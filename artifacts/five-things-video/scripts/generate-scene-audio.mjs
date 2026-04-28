import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL;
const API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY;

if (!BASE_URL || !API_KEY) {
  console.error('Missing env vars');
  process.exit(1);
}

const SCENES = [
  {
    key: 's1_opening',
    text: `You are already helping your child learn. Every single day, without knowing it, without a lesson plan or a textbook — you are doing things that science tells us make a real difference.
Today we want to show you what those things are. So you can do them more. So you can do them on purpose.
Because the most powerful learning tool your child has is not at school. It is at home. It is you.`,
  },
  {
    key: 's2_talk',
    text: `The first thing is the simplest. Talk to your child.
Not instructions. Not just eat this, come here, don't do that. Real conversation. Tell them what you are doing and why. Ask them what they think. Listen to what they say — really listen — and then respond.
Research from South Africa and Brazil that followed children from birth all the way into their teenage years found something remarkable. Children whose caregivers talked with them, responded to them, and engaged with their questions — even in communities with very high poverty — went on to perform significantly better on measures of intelligence and learning than children who experienced less of this back-and-forth.
You don't need a book for this. You don't need electricity. You just need to be present with your child and let them know their voice matters.`,
  },
  {
    key: 's3_questions',
    text: `When your child points at something and asks what is that? — don't just answer. Ask them back. What do you think it is? What does it look like to you? Why do you think it moves that way?
This might feel strange at first. Children ask questions because they want answers. But research consistently shows that children who are asked to think — to guess, to reason, to explain — build much stronger mental habits than children who are simply told.
When you ask a child why — you are building the part of their brain that will one day read a difficult sentence and understand it. Solve a problem they've never seen before. Sit an exam and think it through.
You are not withholding knowledge. You are building something more valuable than any single answer. You are building a thinker.`,
  },
  {
    key: 's4_stories',
    text: `Every culture in Africa has always known this. Stories are how knowledge travels. Stories are how values are passed down. Stories are how children understand the world.
And now science agrees. Book-sharing and storytelling with young children has been shown in randomised trials in low-income South African communities to significantly improve children's vocabulary and language development.
But you don't need a book. Tell your child a story from your own life — from your childhood, from your parents' lives, from your community. Then ask them to retell it. Ask them what happened first. What happened next. What the person in the story was feeling.
Retelling a story is one of the most powerful exercises in comprehension and memory that a child can do. And it costs nothing.`,
  },
  {
    key: 's5_teach',
    text: `This one surprises people. But it is backed by strong evidence.
When a child explains something they have learned — teaches it back to you, walks you through it, shows you how it works — their brain processes that knowledge in a deeper way. They move from remembering it to truly understanding it.
So when your child comes home from school, don't just ask did you behave well today? Ask: what did you learn? Can you teach me? And then listen as if you don't know — even if you do.
Let them be the expert. Let them feel the pride of knowing something. Let them discover that explaining is part of understanding.
This habit alone, practised every day, will make your child a stronger learner across every subject they ever study.`,
  },
  {
    key: 's6_practise',
    text: `Learning requires repetition. And repetition requires patience — from you, and from your child.
When a child is trying to sound out a word, or count out objects, or remember a story — resist the urge to jump in with the answer. Wait. Let them struggle a little. That moment of struggle — that effort — is where learning actually happens in the brain.
And when they get it wrong, respond with curiosity, not disappointment. That's interesting — what made you think that? Let's try again together. A child who learns that mistakes are part of the process will try harder and go further than a child who learns to be afraid of being wrong.
Children whose parents read with them and engage with their learning regularly are two to three times more likely to perform at the expected level in reading — not because their parents are qualified teachers, but because they are present, patient, and interested.`,
  },
  {
    key: 's7_close',
    text: `Talk with them. Ask them questions. Tell them stories. Let them teach you. And let them get things wrong.
Five things. No cost. No materials. No training needed.
Just you — showing up, paying attention, and letting your child know that their learning matters to you.
That is enough. Research tells us it is more than enough.`,
  },
];

async function generateSceneAudio(text) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
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
          content: 'Read the following text aloud with a warm, calm, supportive tone — like a trusted community health worker speaking directly to a parent. Speak naturally and clearly at a measured pace. Do not add commentary, just read the text as provided.',
        },
        { role: 'user', content: text },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const audioData = data.choices?.[0]?.message?.audio?.data;
  if (!audioData) throw new Error('No audio data in response');
  return Buffer.from(audioData, 'base64');
}

function getDurationMs(filePath) {
  const out = execSync(`ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${filePath}"`).toString().trim();
  return Math.round(parseFloat(out) * 1000);
}

async function main() {
  const audioDir = join(__dirname, '../public/audio');
  mkdirSync(audioDir, { recursive: true });

  const durations = {};

  for (const scene of SCENES) {
    console.log(`Generating ${scene.key} (${scene.text.length} chars)...`);
    const buf = await generateSceneAudio(scene.text);
    const filePath = join(audioDir, `${scene.key}.mp3`);
    writeFileSync(filePath, buf);
    const durationMs = getDurationMs(filePath);
    durations[scene.key] = durationMs;
    console.log(`  -> ${durationMs}ms (${(durationMs/1000).toFixed(1)}s)`);
  }

  console.log('\nFinal SCENE_DURATIONS (copy into VideoTemplate.tsx):');
  console.log(JSON.stringify(durations, null, 2));

  const total = Object.values(durations).reduce((a, b) => a + b, 0);
  console.log(`Total: ${total}ms (${(total/1000).toFixed(1)}s)`);
}

main().catch(e => { console.error(e); process.exit(1); });
