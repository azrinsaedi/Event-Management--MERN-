import { Container } from '@mui/material';

export default function LandingPage() {
  return (
    <>
      <Container>
        <header>
          <h1>List of links</h1>
        </header>
        <a href='/admin/signup'>Admin Signup</a>
        <br></br>
        <a href='/admin/login'>Admin Login</a>
        <br></br>
        <a href='/admin/dashboard'>Admin Dashboard</a>
        <br></br>
        <a href='/user/signup'>User Signup</a>
        <br></br>
        <a href='/user/login'>User Login</a>
        <br></br>
        <a href='/user/dashboard'>User Dashboard</a>
      </Container>
    </>
  );
}
