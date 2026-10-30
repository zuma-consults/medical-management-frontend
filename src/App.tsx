import { Navigate, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Dashboard from "./pages/dashboard";
import Patients from "./pages/patients";
import PatientId from "./pages/patients/patientId";
import NursingList from "./pages/nursing/NursingList";
import Laboratory from "./pages/laboratory";
import Imaging from "./pages/imaging";
import Pharmacy from "./pages/pharmacy";
import OPD from "./pages/opd";
import Nursing from "./pages/nursing";
import NotFound from "./pages/NotFound";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import NewPatient from "./pages/patients/newPatient";
import Users from "./pages/settings/users";
import LaboratoryManagement from "./pages/settings/laboratory";
import RadiologyManagement from "./pages/settings/radiology";
import ActivationLayout from "./layouts/ActivationLayout";
import ResetPassword from "./layouts/ResetPassword";
import ForgotPassword from "./layouts/ForgotPassword";
import Finance from "./pages/finance";
import FinanceId from "./pages/finance/financeId";
import FinanceManagement from "./pages/settings/finance";
import VisitManagement from "./pages/settings/visit";
import ConsultationId from "./pages/opd/consultationId";
import PharmacyManagement from "./pages/settings/pharmacy";

const pageVariants = {
  initial: { opacity: 0.5, translateY: -10 },
  animate: { opacity: 1, translateY: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, translateY: 10, transition: { duration: 0.5 } },
};

function App() {
  return (
    <AnimatePresence>
      <Routes>
        {/* routes outside apploayout */}
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/activate" element={<ActivationLayout />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        {/* routes in the applayout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Dashboard />
              </motion.div>
            }
          />
          <Route
            path="/patients"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                key={location.pathname}
                animate="animate"
                exit="exit"
              >
                <Patients />
              </motion.div>
            }
          />
          <Route
            path="/patients/:id"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PatientId />
              </motion.div>
            }
          />
          <Route
            path="/nursing/:id"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <NursingList />
              </motion.div>
            }
          />
          <Route
            path="/patients/new"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <NewPatient />
              </motion.div>
            }
          />
          <Route
            path="/visits"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <OPD />
              </motion.div>
            }
          />
          <Route
            path="/visits/:pid/:cid"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ConsultationId />
              </motion.div>
            }
          />
          <Route
            path="/laboratory"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Laboratory />
              </motion.div>
            }
          />
          <Route
            path="/radiology"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Imaging />
              </motion.div>
            }
          />
          <Route
            path="/pharmacy"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Pharmacy />
              </motion.div>
            }
          />
          <Route
            path="/nursing"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Nursing />
              </motion.div>
            }
          />
          <Route
            path="/finance"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Finance />
              </motion.div>
            }
          />
          <Route
            path="/settings/finance"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FinanceManagement />
              </motion.div>
            }
          />
          <Route
            path="/finance/:id"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FinanceId />
              </motion.div>
            }
          />
          <Route
            path="/settings/users"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Users />
              </motion.div>
            }
          />
          <Route
            path="/settings/laboratory"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LaboratoryManagement />
              </motion.div>
            }
          />
          <Route
            path="/settings/pharmacy"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PharmacyManagement />
              </motion.div>
            }
          />
          <Route
            path="/settings/radiology"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <RadiologyManagement />
              </motion.div>
            }
          />
          <Route
            path="/settings/visit"
            element={
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <VisitManagement />
              </motion.div>
            }
          />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
