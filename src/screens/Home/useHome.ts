import {useEffect, useState} from 'react';
import {get} from 'aws-amplify/api';

import useStore from '../../store';
import type {Rock} from '../../types';
import {apiName, path} from '../../constants';

const useHome = () => {
  const [list, setList] = useState<Rock[]>([]);
  const [loading, setLoading] = useState(true);
  const {token} = useStore();

  const handleList = async () => {
    try {
      const {response} = get({
        apiName,
        path,
        options: {
          headers: {
            Authorization: token,
          },
        },
      });
      const {body} = await response;
      setList((await body.json()) as unknown as Rock[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleList();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {list, loading};
};

export default useHome;
