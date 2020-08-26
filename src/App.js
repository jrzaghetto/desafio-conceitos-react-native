import React, { useEffect, useState } from "react";

import api from './services/api';

import {
  SafeAreaView,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    await api.post(`repositories/${id}/like`)

    const repositoriesUpdated = repositories.map(repository => {
      if (repository.id === id) {
        repository.likes++;
        return repository
      } else {
        return repository
      }
    })
    setRepositories(repositoriesUpdated)
 
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
          <FlatList 
            data={repositories}
            styles={styles.repository}
            keyExtractor={repositories => repositories.id}
            renderItem={({ item: repository }) => (
              <SafeAreaView style={styles.repositoryContainer}>
                <Text styles={styles.likeText} key={repository.id}>{repository.title}</Text>
                <SafeAreaView style={styles.techsContainer}>
                  {repository.techs.map(tech => (
                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}

                  {/* It is necessary when you make shit! Doesn't use method "post" like this:
                            {
                              "title": "Front-End",
                              "url": "http://www.google.com.br",
                              "techs": "ReactJS"
                            }
                      This is the right("techs" need to be in array):
                            {
                              "title": "Front-End",
                              "url": "http://www.google.com.br",
                              "techs": ["ReactJS"]
                            }
                  ------------------------------------------------------------------
                  {(typeof(repository.techs)) === 'string' 
                  ?                   
                  <Text style={styles.tech}>
                    {repository.techs}
                  </Text>
                  : 
                  repository.techs.map(techs => 
                  <Text style={styles.tech}>
                    {techs}
                  </Text>)} */}
                </SafeAreaView>

                <SafeAreaView style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtidas
                  </Text>
                </SafeAreaView>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>

              </SafeAreaView>
            )}
          />
        </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});