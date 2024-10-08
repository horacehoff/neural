import "./Navbar.css"

export default function Navbar() {
    return (
        <>
            <a className="neural" href="/">Neural</a>
            {/*<a className="credits" href="/credits">Credits</a>*/}
            <a className="about" href="https://github.com/horacehoff" target="_blank">About</a>
            <a className="inspire" id="inspire" href="https://github.com/horacehoff/neural" target="_blank">GitHub</a>
        </>
    )
}