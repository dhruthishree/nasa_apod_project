export default function Footer(props) {
    const { handleToggleModal, data, selectedDate, setSelectedDate } = props

    return (
        <footer>
            <div className="bgGradient"></div>

            <div>
                <h1>DHRUTHI'S APOD PROJECT</h1>
                <h2>{data?.title}</h2>

                <div className="date-wrapper">
                    <input
                        type="date"
                        className="date-input"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>
            </div>

            <button onClick={handleToggleModal}>
                <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    )
}