import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div className="text-8xl font-semibold text-center tracking-tighter fromTop pt-20">
        <p> Made for people. </p>
        <p className="text-violet-900">Built for productivity.</p>
      </div>
      <div className="flex justify-center items-center gap-5 pt-16 fromTop delay-500">
        <p className="text-lg">See all that you can accomplish with Slack</p>
        <Button
          variant="outline"
          className="bg-violet-800 text-white hover:bg-violet-900 hover:text-white"
          asChild
        >
          <Link to="/sign-in">Get started</Link>
        </Button>
      </div>
    </>
  );
};

export default Landing;
