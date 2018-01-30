import luigi
from pyspark.sql import SQLContext
from pyspark import SparkContext
from pyspark.sql import Row, StructField, StructType, StringType, IntegerType
import pathutil
#from pathutil import PathSetTask

class VideoDifficulty(luigi.Task):
   
    src = luigi.Parameter(is_list=True)
    include = luigi.Parameter(is_list=True, default=('*',))
    manifest = luigi.Parameter(default=None)
    required_tasks = None
    print(src.value)

    def output(self):
        return MockFile("SimpleTask", mirror_on_stderr=True)
 
    def requires(self):
        if self.required_tasks is None:
           self.required_tasks =  {'insert_source': self.insert_source_task}
        return self.required_tasks
    @property
    def insert_source_task(self):
        """Defines task that provides source of data for insertion."""
        return pathutil.PathSetTask(self.src, self.include, self.manifest)
        #

    def run(self):
        """
        The code for the task will be written inside this method,
        or it will be referred to from this section.
        """
 
 
if __name__ == '__main__':
    from luigi.mock import MockFile # import this here for compatibility with Windows
    # if you are running windows, you wouldn need --lock-pid-dir argument; modified run would look like
    # luigi.run(["--lock-pid-dir", "D:\\temp\\", "--local-scheduler"], main_task_cls=SimpleTask)
    luigi.run(["--local-scheduler"], main_task_cls=VideoDifficulty)
