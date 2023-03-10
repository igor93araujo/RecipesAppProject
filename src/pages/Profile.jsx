import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Index';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'));
  console.log(email.email);

  return (
    <section>
      <Header title="Profile" isIconProfile />
      <p data-testid="profile-email">
        {`Email: ${email.email}`}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Logout
      </button>
      <Footer />
    </section>
  );
}

export default Profile;
