import { motion } from 'framer-motion';

export default function InterestChips({ interests = [] }) {
  return (
    <ul className="interest-chips">
      {interests.map((interest, idx) => (
        <motion.li
          key={interest}
          className="interest-chip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          {interest}
        </motion.li>
      ))}
    </ul>
  );
}