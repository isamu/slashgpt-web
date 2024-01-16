import { ChatSession, ChatConfig, ManifestData } from "slashgpt";

const get_chat_session = (apiKey: string, manifest: ManifestData) => {
  const config = new ChatConfig("");
  return  new ChatSession(config, manifest, {apiKey, dangerouslyAllowBrowser: true});
};
const callback = () => {
  
};

export const call_llm = async (apiKey: string, message: string, manifest: ManifestData) => {
  const session = get_chat_session(apiKey, manifest);
  session.append_user_question(message);
  try {
    await session.call_loop(callback);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { result: false, error: { message: e.message } };
    }
    return { result: false };
  }
  
  const last_message = session.history.last_message();
  if (!last_message) {
    return { result: false, last_message };
  }
  return { result: true, last_message };
};
