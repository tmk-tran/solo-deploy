export default function FifthRingTarget({
  clickFifth,
  clickFourth,
  clickOuter,
  clickInner,
  clickBull,
}) {
  return (
    <div className="fifth-ring" onClick={clickFifth}>
      <div className="fourth-ring2" onClick={clickFourth}>
        <div className="third-ring2" onClick={clickOuter}>
          <div className="three-ring-inner" onClick={clickInner}>
            <div className="fifth-bulls" onClick={clickBull}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
