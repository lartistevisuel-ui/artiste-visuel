import { ArrowUpRight, Ghost, Globe, Mail, Send } from "lucide-react";
import { site, socials } from "../../lib/site";
import Reveal from "../Reveal";
import AnimatedTitle from "../motion/AnimatedTitle";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

const socialIcons: Record<string, React.ReactNode> = {
  Snapchat: <Ghost size={20} />,
  Facebook: <Globe size={20} />,
  Telegram: <Send size={20} />,
};

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <Reveal variant="left">
            <span className="eyebrow">
              <b>05</b> Contact
            </span>
          </Reveal>

          <AnimatedTitle
            className="section-title"
            segments={["Parlons de votre", { accent: "projet." }]}
          />

          <Reveal delay={260}>

          <p className="lead">
            Vous avez un projet de logo, de branding, de site web ou de
            communication&nbsp;? Contactez-moi et créons quelque chose
            d&apos;unique ensemble.
          </p>

          <a href={`mailto:${site.email}`} className={styles.email}>
            <Mail size={20} />
            {site.email}
            <ArrowUpRight size={18} />
          </a>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {socialIcons[social.label]}
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          </Reveal>
        </div>

        <Reveal delay={200} variant="right">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
