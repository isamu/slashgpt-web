import { ChatSession, ChatConfig, ManifestData, ChatData } from "slashgpt";

const get_chat_session = (apiKey: string, manifest: ManifestData) => {
  const config = new ChatConfig("");
  return new ChatSession(config, manifest, { apiKey, dangerouslyAllowBrowser: true });
};
const callback = () => {};

export const call_llm = async (apiKey: string, message: string, manifest: ManifestData, history: ChatData[] = []) => {
  const session = get_chat_session(apiKey, manifest);
  history.map((message) => {
    session.append_message(message.role, message.content, false);
  });
  session.append_user_question(message);
  try {
    await session.call_loop(callback);
  } catch (e: unknown) {
    alert("sorry error: " + e)
    if (e instanceof Error) {
      return { result: false, error: { message: e.message } };
    }
    return { result: false };
  }

  const last_message = session.history.last_message();
  const messages = session.history.messages();
  return { result: !!last_message, last_message, messages };
};
