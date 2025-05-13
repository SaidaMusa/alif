import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import 'animate.css';


const dataOverview = [
  { label: "2021", Electronics: 35, Tools: 51, Home: 15, Sports: 60 },
  { label: "2022", Electronics: 44, Tools: 6, Home: 25, Sports: 50 },
  { label: "2023", Electronics: 24, Tools: 49, Home: 30, Sports: 15 },
  { label: "2024", Electronics: 34, Tools: 30, Home: 50, Sports: 25 },
];

const pieData = [
  { id: 0, value: 10, label: '35+ years' },
  { id: 1, value: 20, label: '18-24 years' },
  { id: 2, value: 30, label: '25-34 years' },
];

const ChartContainer = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mb-8 animate__animated animate__fadeInUp">
    <h2 className="text-2xl font-semibold text-green-700 mb-4">{title}</h2>
    {children}
  </div>
);

export default function Stats() {
  return (
    <div style={{padding:'4rem 2rem'}} className="statistics bg-gradient-to-b w-full from-green-100 to-white min-h-screen p-10 flex flex-col gap-10 justify-center items-center">
     
       <h1 className="text-5xl font-bold text-green-800 mb-6 animate__animated animate__fadeInDown">
        Welcome to AlifShop – Your Trusted Online Shopping Partner!
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-6xl  animate__animated animate__fadeIn">
        At AlifShop, we are committed to bringing you a seamless and enjoyable shopping experience. From the latest electronics to essential home appliances, beauty products, and much more – we have everything you need, all in one place.Our platform is designed to make online shopping simple, secure, and reliable. We carefully select products from trusted brands to ensure quality and satisfaction for every purchase. With fast shipping, secure payment options, and dedicated customer support, we prioritize your convenience and trust.Looking for exclusive deals and discounts? Stay tuned to our promotions and special offers to make the most of your shopping experience with us.Join thousands of satisfied customers who have chosen AlifShop as their preferred online marketplace. Shop smart, shop easy – only at AlifShop.
      </p>
    

      <ChartContainer className="chartContainer" title="Product Statistics Overview">
        <BarChart
          series={[
            { data: dataOverview.map(d => d.Electronics), label: "Electronics & Gadgets", color: "#FFBB00" },
            { data: dataOverview.map(d => d.Tools), label: "Tools & Kids", color: "#007BFF" },
            { data: dataOverview.map(d => d.Home), label: "Home & Lifestyle", color: "#FF5733" },
            { data: dataOverview.map(d => d.Sports), label: "Sports & Automotive", color: "#00C9A7" },
          ]}
          height={290}
          xAxis={[{ data: dataOverview.map(d => d.label), scaleType: "band" }]}
        />
      </ChartContainer>
        <p className='text-gray-600   max-w-6xl animate__animated animate__fadeIn'>At AlifShop, we analyze market trends to provide a better shopping experience. From 2021 to 2024, Electronics & Gadgets maintained strong demand, reaching its peak in 2022 due to new product launches and promotions. Tools & Kids experienced significant growth in 2021, driven by household tools and kids' products, with demand stabilizing in 2023. Home & Lifestyle saw a notable rise in 2024 as we expanded our product range in home decor and kitchen appliances. Sports & Automotive had strong sales in 2021 and 2022, driven by fitness and automotive accessories, with a slight dip in 2023 but a recovery in 2024. Our focus on customer needs and targeted marketing has ensured balanced demand across all categories.</p>

      <ChartContainer title="Customer Demographics">
        <PieChart series={[{ data: pieData }]} skipAnimation={false} />
      </ChartContainer>

      <p className="text-gray-600  max-w-6xl animate__animated animate__fadeIn">
       At AlifShop, understanding customer demographics helps us tailor products and marketing strategies effectively. The 25-34 age group forms the largest segment, actively purchasing lifestyle products, tech gadgets, and home essentials. The 18-24 group, the second-largest, is drawn to electronics and trendy items. The 35+ group, though smaller, focuses on practical purchases like home appliances and tools. By aligning our offerings with these demographics, we maintain strong customer engagement and drive sales across all categories. Thank you for choosing AlifShop  your trusted shopping partner for quality products and exceptional service.
      </p>
    </div>
  );
}
