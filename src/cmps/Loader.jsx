import loader from '../assets/img/loader.svg'
export function Loader() {
    return (
        <div className="loader">
            <img src={loader} alt="" />
        </div>
        // <div id="loader">
        //     <div id="shadow"></div>
        //     <div id="box"></div>
        // </div>
    )
}