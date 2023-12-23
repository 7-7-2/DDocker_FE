import { useState } from 'react';
import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import ProfileImg from '@/components/profile/ProfileImg';
import { FOLLOW } from '@/constants/Follow';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { Between, Column } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/firebase.config';
import { useRecoilState } from 'recoil';
import { imageState } from '@/atoms/atoms';

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const icons = [
    { number: FOLLOW.post, label: '게시물' },
    { number: FOLLOW.following, label: '팔로잉' },
    { number: FOLLOW.followed, label: '팔로워' }
  ];

  const [profileUrl, setProfileUrl] = useRecoilState(imageState);

  const userId = localStorage.getItem('userId');

  const fetchUserProfile = async () => {
    if (!userId) {
      console.error('User ID is null or undefined');
      return;
    }
    const userDocRef = doc(firestore, 'users', userId);
    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const userProfileUrl = userData?.user?.profileUrl || ''; // Adjust the path according to your data structure

        setProfileUrl(userProfileUrl);
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  fetchUserProfile();

  console.log('Profile URL:', profileUrl);

  return (
    <>
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <ProfileImg imageUrl={profileUrl} />
          <ProfileDetail />
          <FollowCount icons={icons} />
        </div>
      </Container>
      <PostsGrid />
    </>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin: 20px 0;
`;

export default Profile;
