import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="h-72 min-h-min mx-auto flex justify-center items-center">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
}
