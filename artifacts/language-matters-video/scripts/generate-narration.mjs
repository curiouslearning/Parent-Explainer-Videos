import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error('Missing AI_INTEGRATIONS_OPENAI_BASE_URL or AI_INTEGRATIONS_OPENAI_API_KEY');
  process.exit(1);
}

const NARRATION = `You want the best for your child. You want them to do well in school, to be confident, to love learning. And you might think the fastest way to get there is to start them on English as early as possible. But research tells us something surprising. The single most powerful thing you can do for your child's education is to make sure they learn to read in your language first.

Here's why. When a child learns to read, their brain is doing something incredible. It's connecting the sounds they already know — the words they've heard since before they were born — to symbols on a page. If those sounds are familiar, that connection happens quickly and naturally. But if a child is learning to read in a language they're still learning to speak — like trying to solve two puzzles at the same time — progress is much slower. And far more children give up.

Studies from across Africa, Asia, and South America consistently show: children who learn to read in their mother tongue in the early years go on to perform better in all subjects — including English, later on. They read faster. They understand more. They stay in school longer. Because once a child truly knows how to read, they can transfer it to any language.

When a child sees their language written down — when they find stories and learning materials in the words they speak at home — it sends them a powerful message: Your language matters. Your family matters. You matter. Children who feel that pride and belonging in the classroom are more engaged, more confident, more willing to learn.

Now, you might wonder: but won't this slow down their English? The evidence says no. A child with strong mother tongue literacy picks up a second language more easily — because they already understand how reading works. Think of it like building a house. You wouldn't skip the foundations to put the roof on faster. Strong foundations make everything above them more stable.

So what can you do? Read with your child in your language. Tell them stories. Sing songs. Every minute your child spends reading in their mother tongue is an investment that pays back across their entire education. Your language is not a barrier. It is the bridge.`;

async function generateTTSViaChat(text) {
  const url = `${BASE_URL}/chat/completions`;
  console.log(`Calling chat completions with audio output...`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-audio',
      modalities: ['text', 'audio'],
      audio: { voice: 'nova', format: 'mp3' },
      messages: [
        {
          role: 'system',
          content: 'Read the following narration text aloud. Use a warm, calm, supportive tone — like a trusted community health worker speaking directly to a parent. Speak naturally and clearly at a measured pace. Do not add commentary, just read the text as provided.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  console.log('Response structure:', JSON.stringify(Object.keys(data)));
  const audioData = data.choices?.[0]?.message?.audio?.data;
  if (!audioData) {
    console.error('Full response:', JSON.stringify(data, null, 2));
    throw new Error('No audio data in response');
  }
  return Buffer.from(audioData, 'base64');
}

async function main() {
  console.log(`Generating narration (${NARRATION.length} chars)...`);
  const audioBuffer = await generateTTSViaChat(NARRATION);
  const outPath = join(__dirname, '../public/audio/narration.mp3');
  writeFileSync(outPath, audioBuffer);
  console.log(`Saved ${audioBuffer.length} bytes to ${outPath}`);
}

main().catch(e => { console.error(e); process.exit(1); });
