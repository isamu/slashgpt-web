import { ChatSession, ChatConfig, ManifestData, ChatData, ChatHistory } from "slashgpt";

const get_chat_session = (apiKey: string, manifest: ManifestData) => {
  const config = new ChatConfig("");
  return new ChatSession(config, manifest, { apiKey, dangerouslyAllowBrowser: true });
};

export const call_llm = async (apiKey: string, message: string, manifest: ManifestData, history: ChatData[] = [], __callback: (history: ChatHistory) => void) => {
  const session = get_chat_session(apiKey, manifest);
  history.map((message) => {
    session.append_message(message.role, message.content, false);
  });
  session.append_user_question(message);
  const callback = () => {
    return __callback(session.history);
  };
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
