import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
export interface PieData {
  name: string;
  value: number;
  color: string;
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 5}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

interface Props {
  t: any;
  data: PieData[];
  title?: string;
}

const featureSatistic = [
  {
    name: "Diret",
    value: 145,
    color: "#14ABE3",
  },

  {
    name: "Organic",
    value: 200,
    color: "#94cbff",
  },
  {
    name: "Referral",
    value: 100,
    color: "#cde7ff",
  },
];

const RChart = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <ResponsiveContainer width="80%" height="80%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={featureSatistic}
            cx="50%"
            cy="50%"
            innerRadius="76%"
            outerRadius="90%"
            labelLine={false}
            fill="#8884d8"
            dataKey="value"
            onMouseOver={onPieEnter}
            onMouseOut={() => setActiveIndex(-1)}
            paddingAngle={activeIndex !== -1 ? 3 : 0}
            animationDuration={800}
            cornerRadius={5}
          >
            {featureSatistic.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex  gap-3 justify-center mt-3">
        {featureSatistic.map((entry, index) => (
          <div key={index} className="flex justify-center items-center  gap-1">
            <div
              className="w-[12px] h-[12px] aspect-square rounded-full me-2"
              style={{ background: entry.color }}
            />
            <p className="text-[12px] font-normal leading-[1.33] text-left text-[#8f9bb3]">
              {entry.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RChart;
