export default function SideBar({ handleToggleModal, data }) {
    if (!data) return null

    return (
        <div className="sidebar">
            <div
                onClick={handleToggleModal}
                className="bgOverlay"
            ></div>

            <div className="sidebarContents">
                <h2>{data.title}</h2>

                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data.date}</p>
                    <p>{data.explanation}</p>
                </div>

                <button
                    className="closeButton"
                    onClick={handleToggleModal}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    )
}