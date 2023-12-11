export default function BullsTarget({ clickBull }) {
  return (
    <div className="bulls-ring">
      <div className="bulls-ring-inner">
        <div className="bulls" onClick={clickBull}></div>
      </div>
    </div>
  );
}
