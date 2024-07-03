import "./Navbar.css"

export default function Navbar() {
    return (
        <>
            <a className="neural" href="/">Neural</a>
            {/*<a className="credits" href="/credits">Credits</a>*/}
            <a className="about" href="https://just-a-mango.github.io" target="_blank">About</a>
            <a className="inspire" id="inspire" href="https://github.com/just-a-mango" target="_blank">GitHub</a>
        </>
    )
}