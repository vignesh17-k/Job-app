import { DEMO_USER, DEMO_JOBS, PAGE_SIZE } from "./demoData";

let demoJobs = [];
let demoUser = { ...DEMO_USER };

const cloneJobs = () => DEMO_JOBS.map((job) => ({ ...job }));

const ensureInitialized = () => {
  if (isDemoMode() && demoJobs.length === 0) {
    demoJobs = cloneJobs();
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        demoUser = JSON.parse(stored);
      } catch {
        demoUser = { ...DEMO_USER };
      }
    }
  }
};

const monthLabel = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString("default", { month: "short", year: "numeric" });
};

export const isDemoMode = () => localStorage.getItem("demoMode") === "true";

export const enableDemoMode = () => {
  demoJobs = cloneJobs();
  demoUser = { ...DEMO_USER };
  localStorage.setItem("demoMode", "true");
  return { ...demoUser };
};

export const disableDemoMode = () => {
  localStorage.removeItem("demoMode");
  demoJobs = [];
  demoUser = { ...DEMO_USER };
};

const sortJobs = (jobs, sort) => {
  const sorted = [...jobs];
  switch (sort) {
    case "oldest":
      return sorted.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    case "a-z":
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    case "z-a":
      return sorted.sort((a, b) => b.company.localeCompare(a.company));
    case "latest":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  }
};

export const filterJobs = ({ status, jobType, sort, page, search }) => {
  ensureInitialized();
  let result = [...demoJobs];

  if (status && status !== "all") {
    result = result.filter((job) => job.status === status);
  }

  if (jobType && jobType !== "all") {
    result = result.filter((job) => job.jobType === jobType);
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      (job) =>
        job.position.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term)
    );
  }

  result = sortJobs(result, sort);

  const totalJobs = result.length;
  const numOfPages = Math.max(1, Math.ceil(totalJobs / PAGE_SIZE));
  const pageNum = Math.min(Math.max(1, page || 1), numOfPages);
  const start = (pageNum - 1) * PAGE_SIZE;
  const jobs = result.slice(start, start + PAGE_SIZE);

  return { jobs, totalJobs, numOfPages };
};

export const getStats = () => {
  ensureInitialized();
  const defaultStats = {
    pending: demoJobs.filter((j) => j.status === "pending").length,
    interview: demoJobs.filter((j) => j.status === "interview").length,
    declined: demoJobs.filter((j) => j.status === "declined").length,
  };

  const monthlyMap = {};
  demoJobs.forEach((job) => {
    const label = monthLabel(job.createdAt);
    monthlyMap[label] = (monthlyMap[label] || 0) + 1;
  });

  const monthlyApplications = Object.entries(monthlyMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return { defaultStats, monthlyApplications };
};

export const addJob = (job) => {
  ensureInitialized();
  const newJob = {
    _id: `demo-job-${Date.now()}`,
    company: job.company,
    position: job.position,
    status: job.status,
    jobType: job.jobType,
    jobLocation: job.jobLocation,
    createdAt: new Date().toISOString(),
    createdBy: "demo-user",
    updatedAt: new Date().toISOString(),
    __v: 0,
  };
  demoJobs.unshift(newJob);
  return { status: 201, data: { job: newJob } };
};

export const updateJob = (job, jobId) => {
  ensureInitialized();
  const index = demoJobs.findIndex((j) => j._id === jobId);
  if (index === -1) {
    return Promise.reject({
      response: { data: { msg: "Job not found" } },
    });
  }
  demoJobs[index] = {
    ...demoJobs[index],
    ...job,
    _id: jobId,
    updatedAt: new Date().toISOString(),
  };
  return { status: 200, data: { job: demoJobs[index] } };
};

export const deleteJob = (id) => {
  ensureInitialized();
  const index = demoJobs.findIndex((j) => j._id === id);
  if (index === -1) {
    return Promise.reject({
      response: { data: { msg: "Job not found" } },
    });
  }
  demoJobs.splice(index, 1);
  return { status: 200, data: { msg: "Job removed" } };
};

export const updateUser = (user) => {
  ensureInitialized();
  demoUser = { ...demoUser, ...user, token: demoUser.token };
  localStorage.setItem("user", JSON.stringify(demoUser));
  return { status: 200, data: { user: demoUser } };
};

export const demoLogin = () => ({
  status: 200,
  data: { user: { ...demoUser } },
});

export const demoRegister = (data) => {
  demoUser = {
    ...DEMO_USER,
    name: data.name || DEMO_USER.name,
    email: data.email || DEMO_USER.email,
    token: "demo-token",
  };
  return { status: 201, data: { user: { ...demoUser } } };
};

export const resolveDemo = (result) => Promise.resolve(result);

export const getDefaultJobsPayload = () =>
  filterJobs({
    status: "all",
    jobType: "all",
    sort: "latest",
    page: 1,
    search: "",
  });
