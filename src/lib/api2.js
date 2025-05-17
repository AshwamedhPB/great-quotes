const FIREBASE_DOMAIN =
  "https://kick-development-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function getAllPoems() {
  const response = await fetch(`${FIREBASE_DOMAIN}/poems.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch poems.");
  }

  const transformedPoems = [];

  for (const key in data) {
    const poemObj = {
      id: key,
      ...data[key],
    };

    transformedPoems.push(poemObj);
  }

  return transformedPoems;
}

export async function getSinglePoem(poemId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/poems/${poemId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch poem.");
  }

  const loadedPoem = {
    id: poemId,
    ...data,
  };

  return loadedPoem;
}

export async function addPoem(poemData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/poems.json`, {
    method: "POST",
    body: JSON.stringify(poemData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create poem.");
  }

  return null;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.poemId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.commentData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not add comment.");
  }

  return { commentId: data.name };
}

export async function getAllComments(poemId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${poemId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not get comments.");
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
