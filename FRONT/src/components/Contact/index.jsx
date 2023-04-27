import { Link } from 'react-router-dom';
import './styles.scss';
import NavBar from '../NavBar';
import Footer from '../Footer';


const ContactCard = ({ avatarUrl, name, email, link }) => {
    return (
        <div className="contact-card">
            <img src={avatarUrl} alt="Avatar" className='contact-card__img' />
            <h3 className='contact-card__title'>{name}</h3>
            <p className='contact-card__text'>{email}</p>
            <a className='contact-card__link' href={link}>Voir le profil</a>
        </div>
    );
};


const Contact = () => {
    const contacts = [
        {
            id: 1,
            name: "Leday Bastien",
            email: "johndoe@example.com",
            avatarUrl: "../../../public/loader.png",
            link: "https://example.com/johndoe"
        },
        {
            id: 2,
            name: "Thibault Guarrigues",
            email: "janesmith@example.com",
            avatarUrl: "https://via.placeholder.com/150",
            link: "https://example.com/janesmith"
        },
        {
            id: 3,
            name: "Alexandre Dupraz",
            email: "bobjohnson@example.com",
            avatarUrl: "https://via.placeholder.com/150",
            link: "https://example.com/bobjohnson"
        },
        {
            id: 4,
            name: "Mohamed Khenissi",
            email: "mkhenissidev@gmail.com",
            avatarUrl: "../../../public/Photo-mk.jpg",
            link: "https://www.linkedin.com/in/Khenissi-M"
        }
    ];

    return (
        <>
            <NavBar />
            <div className="contact">
                <div className="container">
                    <div className="contact-list">
                        {contacts.map((contact) => (
                            <ContactCard
                                key={contact.id}
                                name={contact.name}
                                email={contact.email}
                                avatarUrl={contact.avatarUrl}
                                link={contact.link}
                            />
                        ))}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
