'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './SocialMedia.css';

export default function SocialMedia() {
    return (
        <div className="links">
            <a id="linkedin" href="https://www.linkedin.com/in/marcus-schimizzi-56a6229b" target="_blank">
                <FontAwesomeIcon className="icon items-center inline-flex justify-center h-6 w-6" icon={faLinkedin} />
            </a>
            <a id="github" href="https://github.com/schimizzimj" target="_blank">
                <FontAwesomeIcon className="icon items-center inline-flex justify-center h-6 w-6" icon={faGithub} />
            </a>
            <a id="email" href="mailto:marcus@schimizzi.io" target="_blank">
                <FontAwesomeIcon className="icon items-center inline-flex justify-center h-6 w-6" icon={faEnvelope} />
            </a>
        </div>
    );
}
