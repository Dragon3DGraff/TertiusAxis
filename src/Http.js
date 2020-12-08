class Http {
  constructor(ta_State) {
    this.ta_State = ta_State;
  }

  async checkAuth() {
    try {
      this.ta_State.changeAppState("isLoading", true);

      const response = await fetch("/api/check/checkAuth", {
        method: "POST",
      });
      if (response.status === 200) {
        let answer = await response.json();
        answer.auth = true;
        this.ta_State.changeAppState("userName", answer.userName);
        this.ta_State.changeAppState("userId", answer.userId);
        this.ta_State.changeAppState("auth", answer.auth);
        this.ta_State.changeAppState("isLoading", false);
        return answer;
      } else {
        this.ta_State.changeAppState("userName", undefined);
        this.ta_State.changeAppState("userId", undefined);
        this.ta_State.changeAppState("auth", false);
        this.ta_State.changeAppState("isLoading", false);
        return {
          userName: undefined,
          userId: undefined,
          auth: false,
        };
      }
    } catch (error) {
      this.ta_State.changeAppState("isLoading", false);
    }
  }

  async register(data) {
    try {
      this.ta_State.changeAppState("isLoading", true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        this.ta_State.changeAppState("isLoading", false);
        return 201;
      } else {
        let answer = await response.json();
        this.ta_State.changeAppState("isLoading", false);
        return answer.message;
      }
    } catch (error) {
      this.ta_State.changeAppState("isLoading", false);
    }
  }

  async login(data) {
    try {
      this.ta_State.changeAppState("isLoading", true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
      });
      let answer = await response.json();
      if (answer.userName) {
        this.ta_State.changeAppState("userName", answer.userName);
        this.ta_State.changeAppState("userId", answer.userId);
        this.ta_State.changeAppState("auth", true);
      }
      this.ta_State.changeAppState("isLoading", false);
      return answer;
    } catch (error) {
      this.ta_State.changeAppState("isLoading", false);
    }
  }

  async logout() {
    try {
      this.ta_State.changeAppState("isLoading", true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      this.ta_State.changeAppState("userName", undefined);
      this.ta_State.changeAppState("userId", undefined);
      this.ta_State.changeAppState("auth", false);
      this.ta_State.changeAppState("isLoading", false);
      return res.status;
    } catch (error) {
      this.ta_State.changeAppState("isLoading", false);
    }
  }
}

export { Http };
