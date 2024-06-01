import React from "react";
import 'chart.js/auto'; //これがないと、”arc” is not a registered element.のエラーが出る
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const QuizResult: React.FC<{total:number, collect:number}> = ({total,collect}) => {

    const collectRate = (collect / total) * 100;
    const incollectRate = 100 - collectRate;

    const options = {
        responsive: true,
        cutout: '75%',
        plugins: {
            title: {
                display: false,
                //text: "正解率",
                size: 20,
            },
            //padding:'0px',
        },


    };


    const data = {

        datasets: [{
        //label: ['正解', '不正解'],
        data: [collectRate, incollectRate],
        borderWidth:0,
        //borderColor: 'red',
        backgroundColor: [
            'rgb(255, 205, 86)',//黄色
            'rgb(222, 221, 217)',//灰色
        ],
        hoverOffset: 0
        }]
    };

  return (
    <div className="relative w-60 ml-auto mr-auto">
    
        <div className="absolute top-0 flex justify-center items-center w-full h-60">
            <div className="text-4xl font-bold">{collectRate.toFixed(1)}%</div>
        </div>

        <div className="">
            <Doughnut options={options} data={data} />
        </div>

    </div>

  );
};

