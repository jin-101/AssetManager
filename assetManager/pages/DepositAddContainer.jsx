import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, HStack, VStack, Text } from "native-base";
import InputRadioComponent from "@components/InputRadioComponent";
import InputTextComponent from "@components/InputTextComponent";
import InputDateComponent from "@components/InputDateComponent";
import { useDispatch } from "react-redux";
import { depositDelete, depositUpdate } from "../action";
import { IconButton } from "react-native-paper";

function DepositAddContainer({ item, isOnlyOne }) {
  console.log("DepoAddContainer >>", item);
  const dispatch = useDispatch();
  // const [oneAdd, setOneAdd] = useState({ ...item });
  const didMount = useRef(false); //처음 마운트시 실횅 안되게 하기 위해

  // useEffect(() => {
  //   if (didMount.current) dispatch(depositUpdate(oneAdd));
  //   else didMount.current = true;
  // }, [oneAdd]);

  const deleteButton = useCallback(() => {
    dispatch(depositDelete(item.index));
  }, []);

  const parentFunction = useCallback((name, value) => {
    // setOneAdd((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <VStack alignItems="center">
      <Box bg="blue.100" w="90%" p="5" borderRadius="2xl" mt="5" mb="5">
        <HStack
          justifyContent="space-around"
          alignItems="center"
          mb="5"
          borderRadius="lg"
          backgroundColor="amber.100"
        >
          <Text fontSize="25" color="black">
            상품 정보 추가
          </Text>
          <IconButton
            icon="delete"
            disabled={isOnlyOne}
            iconColor={"red"}
            size={40}
            style={{
              margin: 0,
              padding: 0,
            }}
            onPress={deleteButton}
          />
        </HStack>
        <InputRadioComponent
          name="depositType"
          formControlStyle={{ mb: "5" }}
          title={"상품 선택"}
          list={[
            {
              text: "예금",
              value: "deposit",
              liStyle: { alignItems: "center", mr: "10" },
            },
            {
              text: "적금",
              value: "saving",
              liStyle: { alignItems: "center" },
            },
          ]}
          id={item.index}
          value={item["depositType"]}
          dispatchF={depositUpdate}
        />
        <InputDateComponent
          name="startDate"
          formControlStyle={{ w: "100%", mb: "5" }}
          title={"가입일"}
          helperText={"상품 가입일을 선택하세요."}
          id={item.index}
          value={item["startDate"]}
          dispatchF={depositUpdate}
        />
        <InputDateComponent
          name="endDate"
          formControlStyle={{ mb: "5" }}
          title={"만기일"}
          helperText={"상품 만기일을 입력하세요."}
          id={item.index}
          value={item["endDate"]}
          dispatchF={depositUpdate}
        />
        <InputTextComponent
          name="price"
          inputType={"number"}
          formControlStyle={{ mb: "5" }}
          textLabel={{ endText: "원" }}
          inputStyle={{ width: "90%" }}
          title={"금액"}
          helperText={"예치금액 / 적립금액을 입력하세요."}
          alertContent={"정확한 금액을 입력해주세요."}
          id={item.index}
          value={item["price"] || ""}
          dispatchF={depositUpdate}
        />
        <InputTextComponent
          name="rate"
          inputType={"double"}
          formControlStyle={{ mb: "10" }}
          textLabel={{ endText: "%" }}
          inputStyle={{ width: "90%" }}
          title={"금리"}
          helperText={"상품가입 시 적용 금리(이자율)를 입력하세요."}
          alertContent={"금리를 올바르게 입력해주세요."}
          id={item.index}
          value={item["rate"] || ""}
          dispatchF={depositUpdate}
        />
      </Box>
    </VStack>
  );
}

export default React.memo(DepositAddContainer);
