import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useWindowResize } from '../../hooks';
import FixedBackground from '../../components/FixedBackground';
import Header from '../../components/Header';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { user } = useSelector(({ users }) => users);
  const windowWidth = useWindowResize();
  return (
    <>
      <FixedBackground />
      <Header />
      <section className={styles.container}>
        <Box className={styles.news_box}>
          {!user ? (
            <Card
              sx={{ overflow: 'initial', textAlign: 'center' }}
              className={styles.card}
            >
              <CardHeader title='Greetings !' />
              <CardContent>
                <Typography variant='body1' color='text.secondary'>
                  Welcome to 'Twin Pines'.
                </Typography>
                <Typography variant='body1' color='text.secondary'>
                  To use our application, please{' '}
                  <Link to='/sign-in' style={{ color: '#32114d' }}>
                    sign-in
                  </Link>
                  .
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Haven't account yet ? Try{' '}
                  <Link to='/sign-up' style={{ color: '#32114d' }}>
                    sign-up
                  </Link>
                  .
                </Typography>
              </CardContent>
            </Card>
          ) : null}
          <Card
            sx={{ overflow: 'initial', textAlign: 'initial' }}
            className={styles.card}
          >
            <CardHeader title='Patch 0.1.2' subheader='August 18, 2023' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                -Added prop types for components;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Changed config of docker-compose-dev;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Added Avatar and OnlineBadge components;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Fixed some bugs
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{ overflow: 'initial', textAlign: 'initial' }}
            className={styles.card}
          >
            <CardHeader title='Patch 0.1.1' subheader='August 15, 2023' />
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                -Split auth page on sign-in and sign-up;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Remade validation schems;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Add handling errors on server;
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                -Fixed some bugs
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className={styles.download_box}>
          <article className={styles.user_card}>
            <h3>Coming soon...</h3>
            <p>Try our mobile app</p>
            <ButtonGroup variant='contained'>
              <Button
                disabled
                sx={{ width: windowWidth > 400 ? '180px' : '140px' }}
                startIcon={<AppleIcon sx={{ fontSize: '30px !important' }} />}
              >
                App Store
              </Button>
              <Button
                disabled
                sx={{ width: windowWidth > 400 ? '180px' : '140px' }}
                startIcon={<GoogleIcon sx={{ fontSize: '30px !important' }} />}
              >
                Google Play
              </Button>
            </ButtonGroup>
          </article>
        </Box>
      </section>
    </>
  );
};

export default HomePage;
