const axios = require("axios");
const Chunk = require("../models/Chunk");
const Message = require("../models/Message");
const { PYTHON_EMBEDDING_URL } = require("../utils/pythonService");

// TEMP: cosine similarity function
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

exports.askQuestion = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    // Save user message
    await Message.create({
        projectId,
        role: "user",
        content: question
    });
  

    // 1. Embed the question using Python
    const embedResponse = await axios.post(
        "http://localhost:8000/embed-text",
        { text: question }
      );
      

    const queryEmbedding = embedResponse.data.embedding;

    // 2. Fetch chunks for this project
    const chunks = await Chunk.find({ projectId });

    // 3. Score similarity
    const scored = chunks.map(chunk => ({
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));

    // 4. Pick top 3 relevant chunks
    const topChunks = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(c => c.text);

    // 5. Call LLM (placeholder for now)
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    // 5. Call Gemini LLM
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash"
    });

    // Build prompt (Gemini likes one text block)
    const prompt = `
    You are a Content Architect generating a draft educational explanation.

Use the syllabus content provided as your primary source.
If the syllabus does not clearly contain the answer, state that explicitly.

Do not add external facts or examples beyond the syllabus.

SYLLABUS:
${topChunks.join("\n\n")}

QUESTION:
${question}
    `;

    const result = await model.generateContent(prompt);
    const draft = {
        agent: "Content Architect",
        content: result.response.text()
      };

      const watchdogPrompt = `
      You are a strict curriculum watchdog.
      
      TASK:
      Check whether the ANSWER below strictly adheres to the SYLLABUS.
      Do NOT add new information.
      Do NOT rewrite the answer.
      
      If the answer contains content not supported by the syllabus, mark FAIL.
      
      Respond ONLY in JSON with this format:
      {
        "status": "PASS" or "FAIL",
        "issues": ["issue1", "issue2"]
      }
      
      SYLLABUS:
      ${topChunks.join("\n\n")}
      
      ANSWER:
      ${draft.content}
      `;
      
      // const watchdogResult = await model.generateContent(watchdogPrompt);
      // let watchdogVerdict;

        // try {
        // watchdogVerdict = JSON.parse(watchdogResult.response.text());
        // } catch (e) {
        // watchdogVerdict = {
        //     status: "FAIL",
        //     issues: ["Watchdog output could not be parsed"]
        // };
        // }

        // console.log("Curriculum Watchdog:", watchdogVerdict);


    // Save assistant message
    await Message.create({
        projectId,
        role: "assistant",
        content: draft.content
      });
      
  

      res.json({
        answer: draft.content,
        usedChunks: topChunks.length,
        agent: draft.agent,
        // curriculumCheck: watchdogVerdict.status
      });
      
      

  


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Query failed" });
  }
};
