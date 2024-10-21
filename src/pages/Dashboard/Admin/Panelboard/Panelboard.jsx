import { lazy, Suspense } from "react";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";
const TopPanel = lazy(() => import('./TopPanel'));


const Panelboard = () => {
  return (
    <section className="m-[1rem] text-sm">
      <Suspense fallback={<LoadingSpinner />}>
        <TopPanel />
      </Suspense>
    </section>
  );
}

export default Panelboard
