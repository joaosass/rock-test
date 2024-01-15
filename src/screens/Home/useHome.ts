import {useEffect, useState} from 'react';
import {get} from 'aws-amplify/api';

import useStore from '../../store';
import type {Rock} from '../../types';
import {apiName, path} from '../../constants';

const useHome = () => {
  const [list, setList] = useState<Rock[]>([]);
  const [loading, setLoading] = useState(true);
  const {refetchListKey, token} = useStore();

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
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    handleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchListKey]);

  return {list, loading};
};

export default useHome;
