import Image from "next/image";
import TaskMain from "./main/page";
import TaskPage from "./taskpage/page";
import QuoteGenerator from "./qoutes/page";

export default function Home() {
  return (
    <div>
      
      <TaskPage/>
      <QuoteGenerator/>
    </div>
  );
}
