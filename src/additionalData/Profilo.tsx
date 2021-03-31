import React, { useContext } from "react";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";
import { UserContext } from "../UserProvider";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { actualUser } = useContext(UserContext);

  return (
    <View>
      <Card>
        <Card.Content>
          <Title>{actualUser.email}</Title>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Profile;
