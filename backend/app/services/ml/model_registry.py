class ModelRegistry:
    _instance = None
    _models = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelRegistry, cls).__new__(cls)
            cls._models = {}
        return cls._instance

    def register(self, name: str, service):
        self._models[name] = service

    def get(self, name: str):
        return self._models.get(name)

    def is_loaded(self, name: str) -> bool:
        model = self.get(name)
        return model.is_available() if model else False
