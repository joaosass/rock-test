import React from 'react';
import * as navigation from '@react-navigation/native';
import {fireEvent, render, screen} from '@testing-library/react-native';

import * as store from '../../store';

import RockCard from './RockCard';

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-navigation/native'),
  };
});

const renderCard = () => {
  const navigate = jest.fn();
  const setEditingRock = jest.fn();
  const setIsModalVisible = jest.fn();
  jest.spyOn(navigation, 'useNavigation').mockImplementation(() => ({
    navigate,
  }));

  jest
    .spyOn(store, 'default')
    .mockImplementation(() => ({setEditingRock, setIsModalVisible}));

  render(<RockCard id="1" name="Rock name" price={20} />);
  return {navigate, setEditingRock, setIsModalVisible};
};

describe('Testing component Rockcard', () => {
  it('Should render text', () => {
    renderCard();

    const button = screen.getByText('Rock name');

    expect(button).toBeOnTheScreen();
  });

  it('Should change screen when edit', () => {
    const {navigate, setEditingRock} = renderCard();

    const button = screen.getByTestId('rock-card-edit');
    fireEvent.press(button);

    expect(navigate).toHaveBeenCalledWith('Form');
    expect(setEditingRock).toHaveBeenCalledWith({
      id: '1',
      name: 'Rock name',
      price: 20,
    });
  });

  it('Should open modal when delete', () => {
    const {setEditingRock, setIsModalVisible} = renderCard();

    const button = screen.getByTestId('rock-card-delete');
    fireEvent.press(button);

    expect(setIsModalVisible).toHaveBeenCalledWith(true);
    expect(setEditingRock).toHaveBeenCalledWith({
      id: '1',
    });
  });
});
