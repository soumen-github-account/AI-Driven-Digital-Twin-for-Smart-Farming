import AIAssistantHeader from "../components/ai-assitant/AIAssistantHeader";
import SuggestedQuestions from "../components/ai-assitant/SuggestedQuestions";
import ChatMessage from "../components/ai-assitant/ChatMessage";
import AIAnswerCard from "../components/ai-assitant/AIAnswerCard";
import ChatInput from "../components/ai-assitant/ChatInput";
import CurrentContext from "../components/ai-assitant/CurrentContext";

function AIAssistantPage() {
  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

        {/* =====================================
            MAIN AI AREA
        ===================================== */}

        <section className="min-w-0">

          <AIAssistantHeader />

          <div className="mt-6">
            <ChatMessage
              type="ai"
              message={
                <>
                  Hello! I'm your <strong>AgriTwin AI</strong> assistant.
                  <br />
                  How can I help you today?
                </>
              }
              time="10:30 AM"
            />
          </div>

          <SuggestedQuestions />

          <ChatMessage
            type="user"
            message="Should I irrigate Field 2?"
            time="10:31 AM"
          />

          <AIAnswerCard />

          <ChatInput />

          <p className="mt-3 text-center text-[10px] text-[var(--color-text-muted)]">
            AgriTwin AI may make mistakes. Please verify important information.
          </p>
        </section>

        {/* =====================================
            RIGHT CONTEXT
        ===================================== */}

        <aside className="hidden xl:block">
          <CurrentContext />
        </aside>

      </div>
    </div>
  );
}

export default AIAssistantPage;