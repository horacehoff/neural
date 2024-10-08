import "./Popup.css"

export default function Popup() {
    return (
        <>
            <div className="popup" id="popup" style={{display: "none"}}>
                <p className="popup-title">Knowledge Density</p>
                <p className="popup-content">This metric is estimated by a <a href="https://github.com/horacehoff/knowledge-quantify" target="_blank">custom machine learning model</a>, although occasionally incoherent results are to be expected as the model is still a work-in-progress.</p>
                <button className="popup-close" onClick={() => {
                    document.getElementById("popup").style.display = "none"
                }}>OK</button>
            </div>
        </>
    )
}