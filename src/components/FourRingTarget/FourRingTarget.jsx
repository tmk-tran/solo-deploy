export default function FourRingTarget({
  clickFourth,
  clickOuter,
  clickInner,
  clickBull,
}) {
  return (
    <div className="fourth-ring" onClick={clickFourth}>
      <div className="third-ring" onClick={clickOuter}>
        <div className="three-ring-inner" onClick={clickInner}>
          <div className="three-ring-bulls" onClick={clickBull}></div>
        </div>
      </div>
    </div>
  );
}
