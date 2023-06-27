import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Box, HStack } from "native-base";
import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Carousel from "../external/Carousel";
import ContentScrollView from "@components/ContentScrollView";
import CarCrudPage from "../views/crudPage/CarCrudPage";
import DepositCrudPage from "../views/crudPage/DepositCrudPage";
import StockCRUDpage from "../views/crudPage/StockCRUDpage";
import AptCrudPage from "../views/crudPage/AptCrudPage";
import GoldCrudPage from "../views/crudPage/GoldCrudPage";
import CurrencyCrudPage from "../views/crudPage/CurrencyCrudPage";
import Loading from "@components/Loading";
import StockCRUDpageUpdate from "../views/crudPage/StockCRUDpageUpdate";
import CoinCrudPage from "../views/crudPage/CoinCrudPage";
import { footerHeight, windowWidth } from "../styles";

const entries = [
  { key: "1", title: "예/적금", naviPath: "depositCrud" },
  { key: "2", title: "부동산", naviPath: "" },
  { key: "3", title: "자동차", naviPath: "carCrud" },
  { key: "4", title: "주식", naviPath: "stockCrud" },
  { key: "5", title: "코인", naviPath: "" },
  { key: "6", title: "외환", naviPath: "" },
  { key: "7", title: "금", naviPath: "" },
  // { key: "8", title: "부채1", naviPath: "" },
  // { key: "9", title: "부채2", naviPath: "" },
  // { key: "10", title: "부채3", naviPath: "" },
];

const iconStyle = {
  size: 40,
  color: "black",
};
function AssetContainer() {
  const sliderWidth = windowWidth;
  const itemWidth = windowWidth - 100;
  const [loading, setLoading] = useState(true);
  const itemLength = 7; // item이 늘어나면 숫자 높여준다.
  let loadingCount = 0; // 자식에 데이터가 들어왔는지 판단하기 위한 변수

  const parentLoading = () => {
    loadingCount++;
    console.log(loadingCount);
    if (loadingCount === itemLength) setLoading(false);
  };

  const iconSelectFuntion = (key) => {
    switch (key) {
      case "1":
        return <FontAwesome name="money" {...iconStyle} />;
      case "2":
        return <MaterialIcons name="house" {...iconStyle} />;
      case "3":
        return <Ionicons name="car-sport-sharp" {...iconStyle} />;
      case "4":
        return <Octicons name="graph" {...iconStyle} />;
      case "5":
        return <MaterialCommunityIcons name="bitcoin" {...iconStyle} />;
      case "6":
        return <Fontisto name="money-symbol" {...iconStyle} />;
      case "7":
        return <MaterialCommunityIcons name="gold" {...iconStyle} />;
      // case "8":
      //   return <FontAwesome name="money" {...iconStyle} />;
      // case "9":
      //   return <FontAwesome name="money" {...iconStyle} />;
      // case "10":
      //   return <FontAwesome name="money" {...iconStyle} />;

      default:
        break;
    }
  };

  const contentsFunction = (key) => {
    switch (key) {
      case "1":
        return <DepositCrudPage parentLoading={parentLoading} />;
      case "2":
        return <AptCrudPage parentLoading={parentLoading} />;
      case "3":
        return <CarCrudPage parentLoading={parentLoading} />;
      case "4":
        return <StockCRUDpageUpdate parentLoading={parentLoading} />;
      case "5":
        return <CoinCrudPage parentLoading={parentLoading} />;
      case "6":
        return <CurrencyCrudPage parentLoading={parentLoading} />;
      case "7":
        return <GoldCrudPage parentLoading={parentLoading} />;

      // case "8":
      //   return (
      //     <View>
      //       <Box>
      //         <Text>부채1 관련 surmary</Text>
      //       </Box>
      //     </View>
      //   );
      // case "9":
      //   return (
      //     <View>
      //       <Box>
      //         <Text>부채2 관련 surmary</Text>
      //       </Box>
      //     </View>
      //   );
      // case "10":
      //   return (
      //     <View>
      //       <Box>
      //         <Text>부채3 관련 surmary</Text>
      //       </Box>
      //     </View>
      //   );

      default:
        break;
    }
  };

  const renderItem = ({ item }) => (
    <>
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          backgroundColor: "lightgray",
          borderRadius: 20,
        }}
      >
        <Box w={"100%"}>
          <View style={{ marginTop: 10, alignItems: "center" }}>
            <HStack
              w={"70%"}
              h={70}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={35}
              bg={"white"}
            >
              {iconSelectFuntion(item.key)}
              <Text style={{ color: "black", marginLeft: 10, fontSize: 20 }}>
                {item.title}
              </Text>
            </HStack>
          </View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              // height: "100%",
              alignItems: "center",
            }}
          >
            {contentsFunction(item.key)}
          </View>
        </Box>
      </View>
    </>
  );
  return (
    <>
      <ContentScrollView>
        <Carousel
          data={entries}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
        <View style={{ height: footerHeight }}></View>
      </ContentScrollView>
      {loading && <Loading />}
    </>
  );
}

export default AssetContainer;
