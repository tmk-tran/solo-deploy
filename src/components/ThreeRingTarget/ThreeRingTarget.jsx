export default function ThreeRingTarget({ clickOuter, clickInner, clickBull }) {
  return (
    <div className="three-ring" onClick={clickOuter}>
      <div className="three-ring-inner" onClick={clickInner}>
        <div className="three-ring-bulls" onClick={clickBull}>
        </div>
      </div>
    </div>
  );
}
