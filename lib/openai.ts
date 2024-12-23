import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export async function getAIResponse(messages: Message[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert AI financial advisor. Analyze financial data and provide detailed, actionable advice.
                   Focus on practical recommendations, budget optimization, and long-term financial planning.
                   Be specific with numbers and percentages when making suggestions.
                   Format your responses with clear sections and bullet points for readability.`
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response');
  }
}