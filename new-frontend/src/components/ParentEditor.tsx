import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EssayEditor from './EssayEditor';
import FeedbackDisplay from './FeedbackDisplay';
import { FeedbackItem } from './types';

const ParentComponent = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const hasFeedback = feedbackList.length > 0;
  const [feedbackOccurred, setFeedbackOccurred] = useState<boolean>(false);

  // State variables for hovered and selected feedback items
  const [hoveredFeedbackId, setHoveredFeedbackId] = useState<number | null>(null);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

  useEffect(() => {
    if (hasFeedback) {
      setFeedbackOccurred(true)
    }
  } , [hasFeedback])

  return (
    <div
      className={`flex h-max-[400px] p-4 overflow-hidden ${
        hasFeedback ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* EssayEditor */}
      <motion.div
        key="editor"
        className="flex flex-col"
        animate={{ flexBasis: hasFeedback ? '66.6667%' : '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ flexGrow: 0, flexShrink: 0 }}
      >
        <EssayEditor
          setFeedbackList={setFeedbackList}
          feedbackList={feedbackList}
          hoveredFeedbackId={hoveredFeedbackId}
          selectedFeedbackId={selectedFeedbackId}
          setHoveredFeedbackId={setHoveredFeedbackId}
          setSelectedFeedbackId={setSelectedFeedbackId}
        />
      </motion.div>

      {/* FeedbackDisplay */}
      <AnimatePresence>
        {(hasFeedback || feedbackOccurred) && (
          <motion.div
            key="feedback"
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ flexBasis: '33.3333%', flexGrow: 0, flexShrink: 0 }}
          >
            <FeedbackDisplay
              feedback={feedbackList}
              setHoveredFeedbackId={setHoveredFeedbackId}
              setSelectedFeedbackId={setSelectedFeedbackId}
              hoveredFeedbackId={hoveredFeedbackId}
              selectedFeedbackId={selectedFeedbackId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParentComponent;
