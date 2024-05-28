/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const StyledCard = styled(Card)`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SubscriptionPlans = () => (
  <Container maxWidth="lg" css={css`padding: 20px;`}>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              免费会员（免费）
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              当前已订阅
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
             所有功能每天有限次免费使用
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
            当前已订阅
            </Button>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              vip会员
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              19.9/月
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            所有功能每天有限次使用且接入最强AI模型GPT40和不挂科AI自研算法
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              付款订阅(待上线)
            </Button>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Svip会员
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              99.99/月
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
            所有功能无限次使用且接入最强AI模型GPT40和不挂科AI自研算法
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              付费订阅(待上线)
            </Button>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  </Container>
);

export default SubscriptionPlans;
