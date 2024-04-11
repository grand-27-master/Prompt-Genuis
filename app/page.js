import Feed from "@/components/Feed";
import Form from "@/components/Form";
import Profile from "@/components/Profile";
import PromptCard from "@/components/PromptCard";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Welcome to Prompt Genius!
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          A tool for generating prompts.
        </span>
      </h1>
      <p className="desc text-center">
        Click the button below to generate a writing prompt.
      </p>

      <Feed></Feed>
    </section>
  );
}
