import React from "react";
import { Dimensions } from "react-native";
import { Box, View, Text } from "native-base";
import { PieChart } from "react-native-chart-kit";
import ChartLabelComponent from "../components/ChartLabelComponent";
import { randomColor } from "../utils";

const screenWidth = Dimensions.get("window").width;
const pieGraphSize = screenWidth * 0.95;
const pieGraphPositionFixValue = 0.25;
const pieGraphCenterCircleSize = screenWidth * 0.37;

const graphColor = [
  "#FF3300", //빨
  "#FF9900", //주
  "#F8C12C", //노
  "#00cc33", //초
  "#0033ff", //파
  "#000099", //남
  "#9933cc", //보
];
const assetT = {
  totalDepositAndSavings: "예적금",
  totalApt: "부동산",
  totalCar: "자동차",
  totalGoldAndExchange: "금/외환",
  totalStock: "주식",
  totalCoin: "코인",
  totalAccountBalance: "가계부 잔액",
};

function CustomPieChart({
  totalValue = 1,
  centerTitle = "자산 비율",
  assetTitle = assetT,
  assetData = {},
}) {
  let preColor = graphColor[graphColor.length - 1];
  const chartData = Object.keys(assetData).map((el, index) => {
    preColor = randomColor({ firstColor: graphColor[0], lastColor: preColor });
    return {
      name: assetTitle[el],
      assetRatio: assetData[el],
      color: graphColor.length <= index ? preColor : graphColor[index],
    };
  });

  return (
    <View w={"95%"} alignItems={"center"} justifyContent={"center"}>
      <Box
        w={"90%"}
        borderRadius={20}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"white"}
        shadow={3}
      >
        {totalValue === 1 ? (
          <Box
            width={"100%"}
            height={pieGraphSize}
            borderRadius={20}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"gray.50"}
          >
            <Text fontWeight={"semibold"} color={"gray.400"} fontSize={25}>
              그래프를 불러오는 중입니다.
            </Text>
          </Box>
        ) : (
          <Box w={"100%"} alignItems={"center"} justifyContent={"center"}>
            <PieChart
              data={chartData}
              width={pieGraphSize}
              height={pieGraphSize}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="assetRatio"
              hasLegend={false}
              center={[pieGraphSize * pieGraphPositionFixValue, 0]}
            />
            <Box
              position={"absolute"}
              w={pieGraphCenterCircleSize}
              h={pieGraphCenterCircleSize}
              borderRadius={pieGraphCenterCircleSize * 0.5}
              bg={"white"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"} fontSize={25}>
                {centerTitle}
              </Text>
            </Box>
          </Box>
        )}
        <Box w={"100%"} mb={10}>
          {chartData.map((el, index) => (
            <ChartLabelComponent
              key={index}
              labelColor={el.color}
              label={el.name}
              currentValue={el.assetRatio}
              totalValue={totalValue}
            />
          ))}
        </Box>
      </Box>
    </View>
  );
}

export default CustomPieChart;
