import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Index';
import Header from '../components/Header';
import allImg from '../images/All.png';
import allFavorit from '../images/AllFavorit.png';
import allLogout from '../images/allLogout.png';
import './style/Profile.css';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user')) || { email: '' };

  return (
    <section>
      <Header title="Profile" isIconProfile />
      <main className="main-profile">
        <p data-testid="profile-email">
          {`Email: ${email.email}`}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <img src={ allImg } alt="img" className="img-profile" />
          Done Recipes
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img src={ allFavorit } alt="favorit" className="img-profile" />
          Favorite Recipes
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          <img src={ allLogout } alt="logout" className="img-profile" />
          Logout
        </button>
      </main>
      <Footer />
    </section>
  );
}

export default Profile;
