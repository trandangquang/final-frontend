import React, { useEffect, useState } from 'react';
import { FaChartBar, FaClipboard } from 'react-icons/fa';
import axios from '../axios';
import Chart from './Chart';
import Widget from './Widget';

const SummaryComponent = () => {
  const [orders, setOrders] = useState([]);
  const [income, setIncome] = useState([]);

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
      try {
        const res = await axios.get('http://localhost:8080/orders/stats');
        res.data.sort(compare);
        setOrders(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          'http://localhost:8080/orders/income/stats'
        );
        res.data.sort(compare);
        setIncome(res.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: 'Orders',
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total,
      isMoney: true,
      title: 'Earnings',
    },
  ];
  return (
    <div>
      <div className='bg-slate-700 rounded-lg'>
        <div className='text-slate-200 ml-6 pt-3'>
          <div className='pl-10'>
            <h2>OverView</h2>
            <p>Total orders and income of the shop in 1 month</p>
          </div>
          <div className='flex pl-32'>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
      <div className='pt-16'>
        <div className='border-solid border-2 border-slate-600 pt-4 h-[400px]'>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;
