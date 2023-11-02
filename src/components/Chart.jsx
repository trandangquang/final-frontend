import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import axios from '../axios';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import LoadingComponent from './LoadingComponent';

const Chart = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);

  const compare = (a, b) => {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await axios.get(
          'http://localhost:8080/orders/week-sales/stats'
        );
        res.data.sort(compare);

        const newData = res.data.map((item) => {
          const DAYS = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Saturday',
          ];
          return {
            day: DAYS[item._id - 1],
            amount: item.total
          }
        });
        setSales(newData)
        setLoading(false)
      } catch (e) {
        console.log(e);
        setLoading(false);

      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent>Loading Chart...</LoadingComponent>
      ) : (
        <div className='w-full h-[300px] '>
          <h3 className='pl-6'>Last 7 Days Earnings ($)</h3>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={500}
              height={300}
              data={sales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='amount'
                stroke='#8884d8'
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
